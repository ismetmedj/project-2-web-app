let isIt= [];
setInterval(()=> {
    document.querySelectorAll('form>input').forEach((field) => {
        // console.log(field.value)
        if(!field.value){
            isIt.push('false');
            field.classList.add('nope');
        }else {
            isIt.push('true');
            field.classList.remove('nope');
        }
    })
    if(isIt.includes('false')){
        document.querySelector('.bn54').setAttribute('form', 'none');
        document.querySelector('.bn54').setAttribute('id', 'nope');
        document.getElementById('nope').addEventListener('click', (event) => {
            document.querySelector('h1').classList.remove('animate__fadeInDown', 'animate__delay-1s');
            document.querySelector('h1').classList.add('animate__shakeX')
            document.querySelectorAll('.nope').forEach((el) => el.classList.add('red'))
            setTimeout(() => {
                document.querySelector('h1').classList.remove('animate__shakeX')
                document.querySelectorAll('.red').forEach((el) => el.classList.remove('red'))
            }, 1000);
        })
    }else {
        document.querySelector('h1').classList.remove('animate__shakeX')
        document.querySelector('.bn54').setAttribute('form', 'form');
        document.querySelector('.bn54').setAttribute('id', 'yup');
    }
    isIt= []
}, 200);
