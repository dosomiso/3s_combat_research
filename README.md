# 3s_hit_competition
技擊類競賽


網站資訊如下:</br>
IP:120.107.135.104</br>
ID: hkvcadmin</br>
PassWD: Hkvu4wj/3

combats.hk.edu.tw</br>
網頁密碼:fachen369198*


github repo:</br>
https://github.com/leonardo-lin/3s_hit_competition.git


app.py: 主要啟動程式</br>
test.py: Local測試用 python3 test.py 後可以在 127.0.0.1:5000 檢視自己的網頁 </br>
wrest: 摔角相關資訊</br>
kyc: 克拉柔相關資訊</br>
judo: 柔道相關資訊</br>






我們的服務是使用80 port 對外公開，但80 port在主機中有預設的公開頁面會擋到我們，因此在如果主機被重新開機，80 port就會被占用</br>
若發現被占用時可以kill正在使用該port的process來啟用我們的服務</br>
以下是啟動方法

sudo lsof -i :80 看誰在用80</br>
sudo kill PID</br>
nohup sudo python3 app.py >& log.txt & 服務啟用
