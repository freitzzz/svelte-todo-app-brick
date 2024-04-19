import { isTodoFailure, type AlertsReactor, type TodoState, ShowErrorAlert } from '@reactors';
import { logMessage } from '@web-pacotes/lumberdash';

export const onTodoStateChanged = (state: TodoState, alerts: AlertsReactor) => {
    logMessage(`new state: ${state.type}`);

    if (isTodoFailure(state)) {
        alerts.add(ShowErrorAlert('Update failure', `Couldn't update the last todo`));
    }
};
