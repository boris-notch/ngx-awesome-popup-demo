import { Injectable } from '@angular/core';
import {
  AppearanceAnimation,
  ButtonLayoutDisplay,
  ButtonMaker,
  ConfirmBoxInitializer,
  DialogLayoutDisplay,
  DisappearanceAnimation,
  IConfirmBoxCoreConfig,
  IConfirmBoxPublicResponse,
} from '@costlydeveloper/ngx-awesome-popup';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AlertBoxService {
  confirmBoxConfig: IConfirmBoxCoreConfig = {
    width: '500px',
    height: 'auto',
    disableIcon: true,
    allowHtmlMessage: true,
    animationIn: AppearanceAnimation.BOUNCE_IN, // BOUNCE_IN | SWING | ZOOM_IN | ZOOM_IN_ROTATE | ELASTIC | JELLO | FADE_IN | SLIDE_IN_UP | SLIDE_IN_DOWN | SLIDE_IN_LEFT | SLIDE_IN_RIGHT | NONE
    animationOut: DisappearanceAnimation.BOUNCE_OUT, // BOUNCE_OUT | ZOOM_OUT | ZOOM_OUT_WIND | ZOOM_OUT_ROTATE | FLIP_OUT | SLIDE_OUT_UP | SLIDE_OUT_DOWN | SLIDE_OUT_LEFT | SLIDE_OUT_RIGHT | NONE
  };

  success = (
    title: string,
    message: string,
    confirmLabel?: string,
  ): Observable<IConfirmBoxPublicResponse> =>
    this.#invokeAlertBox(
      DialogLayoutDisplay.SUCCESS,
      title,
      message,
      confirmLabel,
    );

  info = (
    title: string,
    message: string,
    confirmLabel?: string,
  ): Observable<IConfirmBoxPublicResponse> =>
    this.#invokeAlertBox(
      DialogLayoutDisplay.INFO,
      title,
      message,
      confirmLabel,
    );

  warning = (
    title: string,
    message: string,
    confirmLabel?: string,
  ): Observable<IConfirmBoxPublicResponse> =>
    this.#invokeAlertBox(
      DialogLayoutDisplay.WARNING,
      title,
      message,
      confirmLabel,
    );

  danger = (
    title: string,
    message: string,
    confirmLabel?: string,
  ): Observable<IConfirmBoxPublicResponse> =>
    this.#invokeAlertBox(
      DialogLayoutDisplay.DANGER,
      title,
      message,
      confirmLabel,
    );

  none = (
    title: string,
    message: string,
    confirmLabel?: string,
  ): Observable<IConfirmBoxPublicResponse> =>
    this.#invokeAlertBox(
      DialogLayoutDisplay.NONE,
      title,
      message,
      confirmLabel,
    );

  customOne = (
    title: string,
    message: string,
    confirmLabel?: string,
  ): Observable<IConfirmBoxPublicResponse> =>
    this.#invokeAlertBox(
      DialogLayoutDisplay.CUSTOM_ONE,
      title,
      message,
      confirmLabel,
    );

  #invokeAlertBox(
    layoutType: DialogLayoutDisplay,
    title: string,
    message: string,
    confirmLabel?: string,
    confirmBoxConfig: IConfirmBoxCoreConfig = {},
  ): Observable<IConfirmBoxPublicResponse> {
    const newConfirmBox = new ConfirmBoxInitializer();
    newConfirmBox.setButtons([
      new ButtonMaker('OK', 'ok_btn', ButtonLayoutDisplay.SECONDARY),
    ]);
    newConfirmBox.setTitle(title);
    newConfirmBox.setMessage(message);
    newConfirmBox.setConfig({
      ...this.confirmBoxConfig,
      layoutType,
      ...confirmBoxConfig,
    });
    if (confirmLabel) {
      newConfirmBox.setButtonLabels(confirmLabel);
    }
    return newConfirmBox.openConfirmBox$();
  }
}
