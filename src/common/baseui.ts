import {Loading, LoadingController, Toast, ToastController} from "ionic-angular";

export abstract class BaseUI {
  constructor() {}

  //等待的时候显示加载中的状态
  protected showLoading(loadingCtrl: LoadingController, message: string): Loading {
    let loader = loadingCtrl.create({
      content: message,
      dismissOnPageChange: true
    });
    loader.present();
    return loader;
  }
  //toast提示
  protected showToast(toastCtrl: ToastController, message: string): Toast {
    let toast = toastCtrl.create({
      message: message,
      duration: 3000,
      position: 'bottom'
    });
    toast.present();
    return toast;
  }
}
