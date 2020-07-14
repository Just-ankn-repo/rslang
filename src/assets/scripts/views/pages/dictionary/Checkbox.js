export default function checkbox() {
  for(let i=0; i < document.querySelectorAll('.dictionary-element__checkbox').length; i+=1) {
    document.querySelectorAll('.dictionary-element__checkbox')[i].onclick = () => {
        const allChecked = document.querySelectorAll('.dictionary-element__checkbox:checked').length;
        document.getElementById('checkAll').checked = allChecked === document.querySelectorAll('.dictionary-element__checkbox').length;
        document.getElementById('checkAll').indeterminate = allChecked > 0 
        && allChecked < document.querySelectorAll('.dictionary-element__checkbox').length;
    }
}

document.getElementById('checkAll').onclick = () => {
    for(let i=0; i<document.querySelectorAll('.dictionary-element__checkbox').length; i+=1) {
        document.querySelectorAll('.dictionary-element__checkbox')[i].checked = 
        !document.querySelectorAll('.dictionary-element__checkbox')[i].checked;
    }
}
}