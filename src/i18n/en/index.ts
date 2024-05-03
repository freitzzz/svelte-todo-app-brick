import type { BaseTranslation } from '../i18n-types';

const en = {
	todoList: {
		empty: "Nothing here yet! What's on your mind?",
		new: 'New todo...',
		delete: 'Delete completed',
		updated: 'Updated',
		alerts: {
			updateFailure: {
				title: 'Update failure',
				message: "Couldn't update the last todo"
			}
		}
	}
} satisfies BaseTranslation;

export default en;
