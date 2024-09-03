import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";

@Injectable({
  providedIn: 'root',
})
export class NotificationUtilities {

    constructor(
        private snackBar: MatSnackBar
    ) { }

    openSnackbar(message: string, action: string) {
        this.snackBar.open(message, action, {verticalPosition: 'top', horizontalPosition: 'center'});
    }

}