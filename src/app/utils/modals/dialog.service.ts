import { Injectable } from '@angular/core';
import {
  AppearanceAnimation,
  DialogInitializer,
  DialogLayoutDisplay,
  DisappearanceAnimation,
  IDialogCoreConfig,
} from '@costlydeveloper/ngx-awesome-popup';
import { map, Observable, take } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  dialogConfig: IDialogCoreConfig = {
    hideScrollbar: true,
    layoutType: DialogLayoutDisplay.WARNING,
    animationIn: AppearanceAnimation.FADE_IN, // BOUNCE_IN | SWING | ZOOM_IN | ZOOM_IN_ROTATE | ELASTIC | JELLO | FADE_IN | SLIDE_IN_UP | SLIDE_IN_DOWN | SLIDE_IN_LEFT | SLIDE_IN_RIGHT | NONE
    animationOut: DisappearanceAnimation.FADE_OUT, // BOUNCE_OUT | ZOOM_OUT | ZOOM_OUT_WIND | ZOOM_OUT_ROTATE | FLIP_OUT | SLIDE_OUT_UP | SLIDE_OUT_DOWN | SLIDE_OUT_LEFT | SLIDE_OUT_RIGHT | NONE
  };

  previewDialogFullScreen = <DataInput, DataOutput>(
    component: any,
    dataInput: DataInput,
    displayLoader?: boolean,
    dialogConfig: IDialogCoreConfig = {},
  ): Observable<DataOutput> => {
    return this.#invokeDialog(component, dataInput, displayLoader, {
      fullScreen: true,
      ...dialogConfig,
    });
  };
  previewDialogCustomSize = <DataInput, DataOutput>(
    component: any,
    dataInput: DataInput,
    displayLoader?: boolean,
    dialogConfig: IDialogCoreConfig = {},
  ): Observable<DataOutput> => {
    return this.#invokeDialog(component, dataInput, displayLoader, {
      animationIn: AppearanceAnimation.ZOOM_IN,
      animationOut: DisappearanceAnimation.ZOOM_OUT,
      minHeight: '700px',
      minWidth: '700px',
      ...dialogConfig,
    });
  };
  previewDialogFitContent = <DataInput, DataOutput>(
    component: any,
    dataInput: DataInput,
    displayLoader?: boolean,
    dialogConfig: IDialogCoreConfig = {},
  ): Observable<DataOutput> => {
    return this.#invokeDialog(component, dataInput, displayLoader, {
      animationIn: AppearanceAnimation.ZOOM_IN,
      animationOut: DisappearanceAnimation.ZOOM_OUT,
      ...dialogConfig,
    });
  };

  #invokeDialog<DataInput, DataOutput>(
    component: any,
    dataInput: DataInput,
    displayLoader: boolean = false,
    dialogConfig: IDialogCoreConfig = {},
  ): Observable<DataOutput> {
    const dialogInitializer = new DialogInitializer(component);
    dialogInitializer.setCustomData(dataInput);
    dialogInitializer.setConfig({
      ...this.dialogConfig,
      displayLoader,
      ...dialogConfig,
    });

    return dialogInitializer.openDialog$().pipe(
      map((item) => item.payload),
      take(1),
    );
  }
}
