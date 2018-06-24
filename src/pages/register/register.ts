import { Component } from '@angular/core';
import { LoadingController, NavController, NavParams,ToastController, ViewController} from 'ionic-angular';
import {BaseUI} from "../../../../final/src/common/baseui";
import {RestProvider} from "../../providers/rest/rest";

/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage extends BaseUI{
  mobile: any;
  nickname: any;
  password: any;
  confirmPassword: any;
  errorMessage: any;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public ViewCtrl: ViewController,
              public toastCtrl: ToastController,
              public loadingCtrl: LoadingController,
              public rest: RestProvider) {
    super();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  dismiss() {
    this.ViewCtrl.dismiss()
  }
  gotoLogin() {
    this.navCtrl.pop();
  }

  doRegister() {
    if(!(/^[1][3,4,5,7,8][0-9]{9}$/.test(this.mobile))) {
      super.showToast(this.toastCtrl, '您的手机号码格式不正确');
    }else if(this.nickname.length< 3 || this.nickname.length > 10) {
      super.showToast(this.toastCtrl, '昵称的长度应该在3~10位之间');
    }else if(this.password != this.confirmPassword) {
      super.showToast(this.toastCtrl, '两次输入的密码不一致！');
    }else {
      var loading = super.showLoading(this.loadingCtrl, '注册中...');
      this.rest.register(this.mobile,this.nickname,this.password).subscribe(
        f =>{
          if(f["Status"]=="OK"){
            loading.dismiss();
            super.showToast(this.toastCtrl,"注册成功。");
            this.dismiss();
          }else {
            loading.dismiss();
            super.showToast(this.toastCtrl,f["StatusContent"]);
          }
        },
        error1 => this.errorMessage = <any>error1);
    }
  }
}
