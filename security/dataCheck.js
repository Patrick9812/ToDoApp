const miesiac = require('./miesiace')
const dataCheck = (dataNow, dataForm) =>
{
    aktmsc = dataNow.slice(0, 3);
    aktday = dataNow.slice(4, 6);
    aktyear = dataNow.slice(7, 11);

    msc = dataForm.slice(5, 7)
    day = dataForm.slice(8, 10)
    year = dataForm.slice(0, 4)

    miesiac();

    const tabForm = [year, msc, day];
    const tabAkt = [aktyear, aktmsc, aktday];

    let form = tabForm.join("-");
    let akt = tabAkt.join("-");
    const date1 = new Date(form.toString())
    const date2 = new Date(akt.toString())
    const diffTime = Math.abs(date2 - date1);
    if(date1 < date2)
    {
        return 4;
    }
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
    console.log(diffDays)
    if(diffDays > 5)
    {
        return 1;
    }
    else if(diffDays < 5 && diffDays > 0)
    {
        return 2;
    }
    else if(diffDays <= 0)
    {
        return 3;
    }
    else if(diffDays < 5)
    {
        return 4;
    }
}
module.exports = dataCheck;
