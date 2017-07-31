# form2.0
————api部分————

注册用户：/register

活动创建者api：

添加认证：use /creator

创建活动：post /creator/create

查看自己创建的所有活动：get /creator/read

获取特定活动信息：get /creator/change/:formid

修改活动：post /creator/change/:formid

删除活动：delete /creator/delete/:formid

查看指定活动表单：get /creator/readone/:formid

下载表单excel：use /creator/download/:formid

使用者api：

进入首页：get /user/home

获取特定活动信息：get /user/:formid

提交表单：post /user/:formid
