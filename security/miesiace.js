    const mscc = () =>
    {
        if(aktmsc === "Jan")
        {
            aktmsc = "01";
        }
        if(aktmsc === "Feb")
        {
            aktmsc = "02";
        }
        if(aktmsc === "Mar")
        {
            aktmsc = "03";
        }
        if(aktmsc === "Apr")
        {
            aktmsc = "04";
        }
        if(aktmsc === "May")
        {
            aktmsc = "05";
        }
        if(aktmsc === "Jun")
        {
            aktmsc = "06";
        }
        if(aktmsc === "Jul")
        {
            aktmsc = "07";
        }
        if(aktmsc === "Aug")
        {
            aktmsc = "08";
        }
        if(aktmsc === "Sep")
        {
            aktmsc = "09";
        }
        if(aktmsc === "Oct")
        {
            aktmsc = "10";
        }
        if(aktmsc === "Nov")
        {
            aktmsc = "11";
        }
        if(aktmsc === "Dec")
        {
            aktmsc = "12";
        }
        const tab = [aktmsc]
        return tab;
    }
module.exports = mscc;