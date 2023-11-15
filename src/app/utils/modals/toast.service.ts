import { Injectable } from '@angular/core';
import {
  AppearanceAnimation,
  DialogLayoutDisplay,
  DisappearanceAnimation,
  IToastNotificationPublicResponse,
  ToastNotificationInitializer,
  ToastPositionEnum,
  ToastProgressBarEnum,
  ToastUserViewTypeEnum,
} from '@costlydeveloper/ngx-awesome-popup';
import { IToastCoreConfig } from '@costlydeveloper/ngx-awesome-popup/ngx-awesome-popup/types/toast-notification/core/interfaces';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  toastConfig: IToastCoreConfig = {
    autoCloseDelay: 3000,
    disableIcon: true,
    allowHtmlMessage: true,
    textPosition: 'center',
    progressBar: ToastProgressBarEnum.NONE, // INCREASE | DECREASE | NONE
    toastUserViewType: ToastUserViewTypeEnum.SIMPLE, // STANDARD | SIMPLE
    animationIn: AppearanceAnimation.ZOOM_IN, // BOUNCE_IN | SWING | ZOOM_IN | ZOOM_IN_ROTATE | ELASTIC | JELLO | FADE_IN | SLIDE_IN_UP | SLIDE_IN_DOWN | SLIDE_IN_LEFT | SLIDE_IN_RIGHT | NONE
    animationOut: DisappearanceAnimation.ZOOM_OUT, // BOUNCE_OUT | ZOOM_OUT | ZOOM_OUT_WIND | ZOOM_OUT_ROTATE | FLIP_OUT | SLIDE_OUT_UP | SLIDE_OUT_DOWN | SLIDE_OUT_LEFT | SLIDE_OUT_RIGHT | NONE
    toastPosition: ToastPositionEnum.TOP_RIGHT, // TOP_LEFT | TOP_CENTER | TOP_RIGHT | TOP_FULL_WIDTH | BOTTOM_LEFT | BOTTOM_CENTER | BOTTOM_RIGHT | BOTTOM_FULL_WIDTH
  };

  success = (
    title: string,
    message: string,
    confirmLabel?: string,
    declineLabel?: string,
  ): Observable<IToastNotificationPublicResponse> =>
    this.#invokeToast(
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
  ): Observable<IToastNotificationPublicResponse> =>
    this.#invokeToast(
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
  ): Observable<IToastNotificationPublicResponse> =>
    this.#invokeToast(
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
  ): Observable<IToastNotificationPublicResponse> =>
    this.#invokeToast(
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
  ): Observable<IToastNotificationPublicResponse> =>
    this.#invokeToast(
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
  ): Observable<IToastNotificationPublicResponse> =>
    this.#invokeToast(
      DialogLayoutDisplay.CUSTOM_ONE,
      title,
      message,
      confirmLabel,
      declineLabel,
    );

  renderInIDWrapper = (
    openInElementID: string,
    title: string,
    message: string,
    confirmLabel?: string,
    declineLabel?: string,
  ): Observable<IToastNotificationPublicResponse> =>
    this.#invokeToast(
      DialogLayoutDisplay.DANGER,
      title,
      message,
      confirmLabel,
      declineLabel,
      { openInElementID },
    );

  #invokeToast(
    layoutType: DialogLayoutDisplay,
    title: string,
    message: string,
    confirmLabel?: string,
    declineLabel?: string,
    toastConfig: IToastCoreConfig = {},
  ): Observable<IToastNotificationPublicResponse> {
    const toast = new ToastNotificationInitializer();
    toast.setTitle(title);
    toast.setMessage(message);
    toast.setConfig({ ...this.toastConfig, layoutType, ...toastConfig });
    if (confirmLabel) {
      toast.setButtonLabels(confirmLabel, declineLabel);
    }
    /*    toast.setButtons([
				  new ButtonMaker('ok', 'ok', ButtonLayoutDisplay.PRIMARY),
				  new ButtonMaker('fine', 'fine', ButtonLayoutDisplay.SECONDARY),
				  new ButtonMaker('done', 'done', ButtonLayoutDisplay.SUCCESS),
				  new ButtonMaker('clear', 'clear', ButtonLayoutDisplay.DARK),
				]);*/
    return toast.openToastNotification$();
  }
}
