import { format, getTime, formatDistanceToNow } from 'date-fns';
import { HEADER } from 'src/config';

// ----------------------------------------------------------------------

export function fDate(date) {
  return format(new Date(date), 'dd MMMM yyyy');
}

export function fDateTime(date) {

  if(isNaN(date)){
    let dateString = date.replace(/[-]/g,'/').replace('.000000Z', '').replace('T', ' ');
    // console.log(dateString);

    let dated = Date.parse(dateString);
    // console.log(dated)
    // console.log(typeof dated)
    // console.log(format(new Date(dated), 'dd MMM yyyy p'));
    return format(new Date(dated), 'dd MMM yyyy p');
   }else{
    // console.log(date);
    // console.log(typeof date);
    // console.log(format(new Date(date), 'dd MMM yyyy p'));
    return format(new Date(date), 'dd MMM yyyy p');
   }

    console.log(typeof date)
    return format(new Date(date), 'dd MMM yyyy p');
  
}

export function fTimestamp(date) {
  return getTime(new Date(date));
}

export function fDateTimeSuffix(date) {
  return format(new Date(date), 'dd/MM/yyyy hh:mm p');
}

export function fToNow(date) {
  return formatDistanceToNow(new Date(date), {
    addSuffix: true,
  });
}
