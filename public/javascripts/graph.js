$(document).ready(function(){
var head = ['#','IP','icon','ASN','neighbours','topology'];
var body = [
  ['202.118.224.100','CN','4538','details','details'],
  ['202.118.224.101','CN','4538','details','details'],
  ['202.118.224.102','CN','4538','details','details'],
  ['202.118.224.103','CN','4538','details','details'],
];
var data = {
  'head': head, 
  'body': body
};

var options = {}
var container = document.getElementById('table_div');

console.log(container);
var table = new mytable.myTable(container, data, options);
});
