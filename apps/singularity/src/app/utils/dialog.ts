export default class DialogUtils {


    static OpenModal(dialogId: string) {
        const dialog = document.getElementById(dialogId) as HTMLDialogElement;
        if (dialog) {
            dialog.showModal();
        }
    }

    static CloseModal(dialogId: string) {
        const dialog = document.getElementById(dialogId) as HTMLDialogElement;
        if (dialog) {
            dialog.close();
        }
    }
}