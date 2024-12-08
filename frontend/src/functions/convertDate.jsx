export const convertDate = (number) => {
    let myDate = new Date(number);
    let myMonth = myDate.getMonth() + 1
    return myDate.getDate() + " / " + myMonth;
}