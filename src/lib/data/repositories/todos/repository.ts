import { Todo } from '@models';
import {
	Right,
	type Either,
	fold,
	type TypedError,
	Left,
	type IOError
} from '@web-pacotes/foundation-types';
import { logMessage } from '@web-pacotes/lumberdash';
import type { BrowserStorage } from '@data';

/**
 * A repository for managing todos.
 */
export interface TodosRepository {
	add(todo: Todo): Promise<Either<TypedError, void>>;

	all(): Promise<Either<TypedError, Todo[]>>;
}

/**
 * An [TodosRepository] implementation for debug purposes only.
 */
export class FakeTodosRepository implements TodosRepository {
	private cache = new Array<Todo>(...[Todo('Star .bricks repository'), Todo('Finish v2')]);

	add(todo: Todo): Promise<Either<TypedError, void>> {
		this.cache.push(todo);

		return Promise.resolve(Right(undefined));
	}

	all(): Promise<Either<TypedError, Todo[]>> {
		return Promise.resolve(Right(this.cache));
	}
}

/**
 * A [TodosRepository] implementation that uses a [BrowserStorage] as the database for saving and
 * retrieving todos.
 */
export class BrowserStorageTodosRepository implements TodosRepository {
	private readonly storage: BrowserStorage<string>;
	private readonly cache = new Array<Todo>();

	constructor(storage: BrowserStorage<string>) {
		this.storage = storage;
		this.cache = new Array<Todo>();
	}

	async add(todo: Todo): Promise<Either<TypedError, void>> {
		this.cache.push(todo);

		const result = await this.storage.store('todos', JSON.stringify(this.cache));

		return fold<IOError, string, Either<TypedError, void>>(
			result,
			(l) => {
				this.cache.pop();

				return Left(l);
			},
			(r: string) => {
				logMessage(`added todos in browser storage: (written ${r.length} bytes)`);

				return Right(undefined);
			}
		);
	}

	async all(): Promise<Either<TypedError, Todo[]>> {
		if (this.cache.length > 0) {
			return Right(this.cache);
		}

		const result = await this.storage.lookup('todos');

		return fold<IOError, string, Either<TypedError, Todo[]>>(
			result,
			(l) => {
				this.cache.pop();

				return Left(l);
			},
			(r: string) => {
				this.cache.push(...JSON.parse(r));

				return Right(this.cache);
			}
		);
	}
}
