import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

// 選擇文本區域並初始化 CKEditor
ClassicEditor
.create(document.querySelector('#editor'))
.then(editor => {
    console.log('Editor was initialized', editor);
})
.catch(error => {
    console.error('There was a problem initializing the editor.', error);
});