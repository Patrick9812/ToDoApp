const dateNaw = () =>
{
    const data = Date();
    const da = data.toString().split(" ").slice(1, 4);
    const tab = [da[0], da[1], da[2]];
    const lama = tab.join(' ');
    return lama;
}
module.exports = dateNaw;