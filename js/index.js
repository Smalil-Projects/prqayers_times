
const getPrayer = (cityCode) =>
{

    let params = {
        country: 'EG',
        city: cityCode
    }
    axios.get('https://api.aladhan.com/v1/timingsByCity', {
        params: params
    })
        .then(function (response)
        {
            let Timings = response.data.data.timings;
            const readable = response.data.data.date.readable;
            const weekday = response.data.data.date.hijri.weekday.ar;
            timeForEachPayer('fajr-time', Timings.Fajr);
            timeForEachPayer('shrok-time', Timings.Sunrise);
            timeForEachPayer('dhuhr-time', Timings.Dhuhr);
            timeForEachPayer('asr-time', Timings.Asr);
            timeForEachPayer('maghrib-time', Timings.Maghrib);
            timeForEachPayer('isha-time', Timings.Isha);



            // Format the date in Arabic
            const [day, month, year] = readable.split(' ');
            const monthIndex = new Date(`${month} 1, ${year}`).getMonth();
            const date = new Date(year, monthIndex, day);
            const options = { day: 'numeric', month: 'long', year: 'numeric' };
            const arabicDate = new Intl.DateTimeFormat('ar-EG', options).format(date);
            document.getElementById('date').innerHTML = weekday + "," + arabicDate;


        })
        .catch(function (error)
        {
            console.log(error);
        })
}
getPrayer('DT');

function timeForEachPayer (id, time)
{
    document.getElementById(id).innerHTML = time;

}
// loop to  show all cities
const cites = [
    {
        arabicName: 'دمياط',
        codeCity: 'DT'
    },
    {
        arabicName: 'البحر الأحمر	',
        codeCity: 'BA'
    },
    {
        arabicName: 'البحيرة',
        codeCity: 'BH'
    },
    {
        arabicName: 'الفيوم	',
        codeCity: 'FYM'
    },
    {
        arabicName: 'الغربية	',
        codeCity: 'GH'
    },
    {
        arabicName: 'الإسكندرية',
        codeCity: 'ALX'
    },
    {
        arabicName: 'الإسماعيلية',
        codeCity: 'IS'
    },
    {
        arabicName: 'الجيزة	',
        codeCity: 'GZ'
    },
    {
        arabicName: 'المنُوفيّة',
        codeCity: 'MNF'
    },
    {
        arabicName: 'المنيا	',
        codeCity: 'MN'
    },
    {
        arabicName: 'القاهرة',
        codeCity: 'C'
    },
    {
        arabicName: 'القليوبية	',
        codeCity: 'KB'
    },
    {
        arabicName: 'الأقصر',
        codeCity: 'LX'
    },
    {
        arabicName: 'الوادي الجديد	',
        codeCity: 'WAD'
    },
    {
        arabicName: 'السويس',
        codeCity: 'SUZ'
    },
    {
        arabicName: 'الشرقية',
        codeCity: 'SHR'
    },
    {
        arabicName: 'أسوان',
        codeCity: 'ASN'
    },
    {
        arabicName: 'أسيوط',
        codeCity: 'AST'
    },
    {
        arabicName: 'بني سويف	',
        codeCity: 'BNS'
    },
    {
        arabicName: 'بورسعيد',
        codeCity: 'PTS'
    },

    {
        arabicName: 'الدقهلية',
        codeCity: 'DK'
    },
    {
        arabicName: 'جنوب سيناء	',
        codeCity: 'JS'
    },
    {
        arabicName: 'كفر الشيخ	',
        codeCity: 'KFS'
    },
    {
        arabicName: 'مطروح	',
        codeCity: 'MT'
    },
    {
        arabicName: 'قنا',
        codeCity: 'KN'
    },
    {
        arabicName: 'شمال سيناء	',
        codeCity: 'SIN'
    },
    {
        arabicName: '	سوهاج',
        codeCity: 'SHG'
    },


]
for (let city of cites) {
    document.getElementById('select-city').innerHTML += `<option value="${city.arabicName}">${city.arabicName}</option>`
}
// make change for each select option form select
document.getElementById('select-city').addEventListener('change', (e) =>
{
    document.getElementById('city-name').innerHTML = e.target.value
    let code = ''
    for (let city of cites) {
        if (city.arabicName === e.target.value) {
            code = city.codeCity
        }
    }
    getPrayer(code)
    // console.log(e.target.value);

})
