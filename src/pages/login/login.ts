import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, ToastController, ViewController } from 'ionic-angular';
import {BaseUI} from "../../common/baseui";
import {RestProvider} from "../../providers/rest/rest";
import { Storage } from '@ionic/storage';
import {RegisterPage} from "../register/register";

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage extends BaseUI{
  mobile: any;
  password: any;
  errorMessage: any;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public viewCtrl: ViewController,
              public loadingCtrl: LoadingController,
              public rest: RestProvider,
              public toastCtrl: ToastController,
              public storage: Storage) {
    super();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  login() {
    var loading = super.showLoading(this.loadingCtrl, "登录中...");
    this.rest.login(this.mobile, this.password)
      .subscribe(
        f => {
          console.log(f['Status']);
          if (f["Status"] == "OK") {
            //处理登录成功的页面跳转
            //你也可以存储接口返回的 token
            this.storage.set('UserId', f["UserId"]);
            loading.dismiss();
            this.dismiss();
          }
          else {
            loading.dismiss();
            super.showToast(this.toastCtrl, f["StatusContent"]);
          }
        },
        error => this.errorMessage = <any>error);
  }

  //关闭当前页面的方法
  dismiss() {
    this.viewCtrl.dismiss();
  }
  //跳转到注册页面
  pushRegisterPage() {
    this.navCtrl.push(RegisterPage);
  }
}
