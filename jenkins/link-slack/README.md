# slackと連携する方法
slack側とjenkins側の設定が入ります。もちろん通知したいjobにも必要ですよ。

## jenkins
slack notificationsのプラグインをいれてください。

## slack
slackのJenkins用のappをいれます。

integrationトークンとチームのサブドメインがjenkinsのjob設定時に必要です。

## 当該job
今回はフリースタイルのプロジェクトビルドで設定します。

設定下部にビルド後の処理があり、[slack notifications]が選択できるようになっている。

いつ通知するか選択して、custom messageも送れます。

※rest apiから送ったパラメータは$<key>で参照できるようです。

e.g.
```
kicked by $user
```
↓
```
jenkins APP [11:43 PM] 
----------------
slack-test - #3 Success after 13 ms (Open)
kicked by foobartarou
```

```
curl -X POST http://$user:$pass@localhost:8080/job/slack-test/build --data-urlencode json='{"parameter
": [{"name":"user", "value":"mesh1neko"}]}'
```

![shell->jenkins->slack](https://lh3.googleusercontent.com/RW-ajzjEnxbUVkstRoWBEC3HwCj4vHCnjyfXOIDNUm_izA8nNouhrSKbQR2vDBUMJogIyxi6k055g01VnwI73kJtqWVPsyNwsfATWySdqlB69OyuhwCPzPWCXqrvRmNdCtzp84T4DuDxnt23dCkfiqmSRWoc0tzMO04fwaA6uzLoBrVez3VlSxIY_0rMjngMkugyETo5did2S7346ktR_m8pTiWHkFtKFKYjB9ebzJTekc-6zJs3Wn3jOVQYO_xZ6NYKVcP9O-DuzEx3iBu8h5wy_AMkeFoYR9nsQVYaOOKcEVBY5a6nd45TbOFrQ3rfar4lbhSBaS2cOvC4QkD_68opnQ-MoXzIFC3eHjfHwmoP_kD_OxuSxVirq3D2h3EOMPcrWC19nM1n180i3hXdUPFVJKnVe-EBQ8XR95cQ2gUxYGuh2oYvstucJA_GmnZbHzN3cWTx2y6BOTolNbo1q-jLoYp3USzWBeQd6fUQiFRFDmqonr-tbUgVvgIG5eTJOhzzL3UtUuHt82yBzc-byR59M-27b7Z7pnVU53qKic_coE7vvCuHrTVoTyJtUTGornMWJ864Cw5MopMXSxeqrXQeigl1pE_ttCiHEbBKQ78_CvTCTFGE=w960-h151-no)