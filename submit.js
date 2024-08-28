    function submitForm() 
    {
        const name = document.getElementById('name').value;
        const gender = document.getElementById('gender').value;
        const id = document.getElementById('id').value;
        const school = document.getElementById('school').value;
        const grade = document.getElementById('grade').value;
        const telep = document.getElementById('telep').value;
        const cppgr = document.getElementById('cppgr').value;

        if (!name || !gender || !id || !grade || !school || !telep || !cppgr) {
            alert('所有字段均为必填项，请确保每一项都填写了！');
            return;
        }

        const data = {
            name: name,
            gender: gender,
            id: id,
            school: school,
            grade: grade,
            telep: telep,
            cppgr: cppgr
        };

        $('#loading').css('opacity', 1);

        fetch('https://tanginfo.rawsite.icu/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => {
            $('#loading').css('opacity', 0);
            if (response.status === 409) {
                alert('错误: 该身份证号对应的个人信息已存在，请勿重新填写！');
                return Promise.reject('ID already exists');
            }
            return response.json();
        })
        .then(data => {
            if (data.rank) {
                alert('提交成功！ 你是第 ' + data.rank + ' 个提交的！');
                // 清空表单
                document.getElementById('name').value = '';
                document.getElementById('gender').value = '';
                document.getElementById('id').value = '';
                document.getElementById('school').value = '';
                document.getElementById('grade').value = '';
                document.getElementById('telep').value = '';
                document.getElementById('cppgr').value = '';
            }
        })
        .catch((error) => {
            console.error('Error:', error);
            if (error !== 'ID already exists') {
                alert('错误出现，请联系唐老师');
            }
        });
    }