import { Injectable } from '@angular/core';
import {
  AppearanceAnimation,
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
export class ConfirmBoxService {
  confirmBoxConfig: IConfirmBoxCoreConfig = {
    width: '300px',
    height: 'auto',
    disableIcon: true,
    allowHtmlMessage: true,
    animationIn: AppearanceAnimation.ZOOM_IN, // BOUNCE_IN | SWING | ZOOM_IN | ZOOM_IN_ROTATE | ELASTIC | JELLO | FADE_IN | SLIDE_IN_UP | SLIDE_IN_DOWN | SLIDE_IN_LEFT | SLIDE_IN_RIGHT | NONE
    animationOut: DisappearanceAnimation.ZOOM_OUT, // BOUNCE_OUT | ZOOM_OUT | ZOOM_OUT_WIND | ZOOM_OUT_ROTATE | FLIP_OUT | SLIDE_OUT_UP | SLIDE_OUT_DOWN | SLIDE_OUT_LEFT | SLIDE_OUT_RIGHT | NONE
  };

  success = (
    title: string,
    message: string,
    confirmLabel?: string,
    declineLabel?: string,
  ): Observable<IConfirmBoxPublicResponse> =>
    this.#invokeConfirmBox(
      DialogLayoutDisplay.SUCCESS,
      title,
      message,
      confirmLabel,
      declineLabel,
    );

  info = (
    title: string,
    message: string,
    confirmLabel?: string,
    declineLabel?: string,
  ): Observable<IConfirmBoxPublicResponse> =>
    this.#invokeConfirmBox(
      DialogLayoutDisplay.INFO,
      title,
      message,
      confirmLabel,
      declineLabel,
    );

  warning = (
    title: string,
    message: string,
    confirmLabel?: string,
    declineLabel?: string,
  ): Observable<IConfirmBoxPublicResponse> =>
    this.#invokeConfirmBox(
      DialogLayoutDisplay.WARNING,
      title,
      message,
      confirmLabel,
      declineLabel,
    );

  danger = (
    title: string,
    message: string,
    confirmLabel?: string,
    declineLabel?: string,
  ): Observable<IConfirmBoxPublicResponse> =>
    this.#invokeConfirmBox(
      DialogLayoutDisplay.DANGER,
      title,
      message,
      confirmLabel,
      declineLabel,
    );

  none = (
    title: string,
    message: string,
    confirmLabel?: string,
    declineLabel?: string,
  ): Observable<IConfirmBoxPublicResponse> =>
    this.#invokeConfirmBox(
      DialogLayoutDisplay.NONE,
      title,
      message,
      confirmLabel,
      declineLabel,
    );

  customOne = (
    title: string,
    message: string,
    confirmLabel?: string,
    declineLabel?: string,
  ): Observable<IConfirmBoxPublicResponse> =>
    this.#invokeConfirmBox(
      DialogLayoutDisplay.CUSTOM_ONE,
      title,
      message,
      confirmLabel,
      declineLabel,
    );

  #invokeConfirmBox(
    layoutType: DialogLayoutDisplay,
    title: string,
    message: string,
    confirmLabel?: string,
    declineLabel?: string,
    confirmBoxConfig: IConfirmBoxCoreConfig = {},
  ): Observable<IConfirmBoxPublicResponse> {
    const newConfirmBox = new ConfirmBoxInitializer();
    newConfirmBox.setTitle(title);
    newConfirmBox.setMessage(message);
    newConfirmBox.setConfig({
      ...this.confirmBoxConfig,
      layoutType,
      ...confirmBoxConfig,
    });
    if (confirmLabel) {
      newConfirmBox.setButtonLabels(confirmLabel, declineLabel);
    }
    return newConfirmBox.openConfirmBox$();
  }
}
