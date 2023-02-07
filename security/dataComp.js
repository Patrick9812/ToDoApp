const miesiac = require('./miesiace')
const compare = (dataNow, dataForm) =>
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

    const form = tabForm.join("-");
    const akt = tabAkt.join("-");

    if(akt <= form )
    {
        return true;
    }
    else
    {
        return false;
    }
}
module.exports = compare;