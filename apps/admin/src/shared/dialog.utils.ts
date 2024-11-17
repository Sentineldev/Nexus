export default class DialogUtils {


    public static Open(dialogId: string) {


        const modal = document.getElementById(dialogId) as HTMLDialogElement;

        if (modal) {
            modal.showModal();
        }
    }

    public static Close(dialogId: string) {


        const modal = document.getElementById(dialogId) as HTMLDialogElement;

        if (modal) {
            modal.close();
        }
    }
}