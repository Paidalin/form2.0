# form2.0
状态码
---
		1001--活动名已存在
		1002--没有该活动
		1003--下载文件失败
		1101--没有该活动
api
===
注册用户：`/register`

使用者api
---
进入首页：`get` `/user/home`

返回

    {
        id: xxxxxxxx,
        actionName: 'action',
        startDate: 2017-01-01 00:00:00,
        endDate: 2017-01-02 00:00:00,
        description: '简单的表述',
        logoUrl: 'xxxxxxxxxx',
    }
    
获取特定活动信息：`get` `/user/:formid`

返回

    {
        startDate: 2017-01-01 00:00:00,
        endDate: 2017-01-02 00:00:00,
        actionName: 'action',
        // 为创建者自定义的表单信息
        action: {
            name: '填写的格式，如：字长，类型等',
            sex: true,
            ...
        },
        creator: req.session.user._id,
        description: '简单的表述',
        detail: '详细的表述',
        isDeleted: false,
        isHidden: false,
        logoUrl: 'xxxxxxxxxx',
    }
    
提交表单：`post` `/user/:formid`
    
发送

    {
        // 为创建者自定义的表单信息
        form: {
            name: '填写的格式，如：字长，类型等',
            sex: true,
            ... 
        },
    }
    
    
创建者api
---
添加认证：`use` `/creator`


创建活动：`post` `/creator/create`

发送

    {
        startDate: 2017-01-01 00:00:00,
        endDate: 2017-01-02 00:00:00,
        actionName: 'action',
        // 为创建者自定义的表单信息
        action: {
            name: '填写的格式，如：字长，类型等',
            sex: true,
            ...
        },
        description: '简单的表述',
        detail: '详细的表述',
        isHidden: false,
        logoUrl: 'xxxxxxxxxx',
    }

查看自己创建的所有活动：`get` `/creator/read`

返回

    {
        { actionName:'xxx', id:xxxxxxxxxx },
        { actionName:'xxx', id:xxxxxxxxxx },
        { actionName:'xxx', id:xxxxxxxxxx },
        ...
    }
    
获取特定活动信息：`get` `/creator/change/:formid`

返回

    {
        startDate: 2017-01-01 00:00:00,
        endDate: 2017-01-02 00:00:00,
        actionName: 'action',
        // 为创建者自定义的表单信息
        action: {
            name: '填写的格式，如：字长，类型等',
            sex: true,
            ...
        },
        creator: xxxxxxxx,
        description: '简单的表述',
        detail: '详细的表述',
        isDeleted: false,
        isHidden: false,
        logoUrl: 'xxxxxxxxxx',
    }
		
修改活动：`post` `/creator/change/:formid`

发送

    {
        startDate: 2017-01-01 00:00:00,
        endDate: 2017-01-02 00:00:00,
        actionName: 'action',
        // 为创建者自定义的表单信息
        action: {
            name: '填写的格式，如：字长，类型等',
            sex: true,
            ...
        },
        description: '简单的表述',
        detail: '详细的表述',
        isHidden: false,
        logoUrl: 'xxxxxxxxxx',
    }
    
删除活动：`delete` `/creator/delete/:formid`

查看指定活动所有表单：`get` `/creator/readone/:formid`

返回

    {
        // 活动信息
        { action：'name,sex,age...' },
        // 用户信息
        { form：'林广，true，20' },
        { form：'林广，true，20' },
        { form：'林广，true，20' },
        ...
    }
    
下载表单excel：`use` `/creator/download/:formid`


