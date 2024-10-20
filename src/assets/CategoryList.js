import heroLower_Electrician from './heroLower_Electrician.jpg'
import heroLower_Cook from './heroLower_Cook.jpg'
import heroLower_Priest from './heroLower_Priest.jpg'
import heroLower_Talior from './heroLower_Talior.jpg'
import heroLower_Contractor from './heroLower_Contractor.jpg'
import Category_Labourer from './Category_Labourer.jpg'
import Category_Mechanic from './Category_Mechanic.jpg'
import Category_Tutor from './Category_Tutor.jpg'

export const categoryList = [
    {
        Category: 'Electrician',
        image: heroLower_Electrician,
        URL: 'http://localhost:5000/services/electrician',
        // URL: 'https://prowork.live/services/electrician',
        // URL: 'http://192.168.30.112:5000/services/electrician',
        Travel: 35,
        service1: 'services1',
        service2: 'services2',
        service3: 'services3',
        service4: 'services4',
        service5: 'services5',

        service_Price1: 'Rs.750-Rs.950',
        service_Price1_low: 750,
        service_Price1_high: 950,
        service_Price2: 'Rs.499-Rs.599',
        service_Price2_low: 499,
        service_Price2_high: 599,
        service_Price3: 'Rs.750-Rs.850',
        service_Price3_low: 750,
        service_Price3_high: 850,
        service_Price4: 'Rs.999-Rs.1199',
        service_Price4_low: 999,
        service_Price4_high: 1199,
        service_Price5: 'Rs.350-Rs.400',
        service_Price5_low: 350,
        service_Price5_high: 400,
    },
    {
        Category: 'Priest',
        image: heroLower_Priest,
        // URL: 'https://prowork.live/services/priest',
        URL: 'http://localhost:5000/services/priest',
        Travel: 35,
        service1: 'servicesP1',
        service2: 'servicesP2',
        service3: 'servicesP3',
        service4: 'servicesP4',
        service5: 'servicesP5',

        service_Price1: 'Rs.750-Rs.950',
        service_Price1_low: 750,
        service_Price1_high: 950,
        service_Price2: 'Rs.499-Rs.599',
        service_Price2_low: 499,
        service_Price2_high: 599,
        service_Price3: 'Rs.750-Rs.850',
        service_Price3_low: 750,
        service_Price3_high: 850,
        service_Price4: 'Rs.999-Rs.1199',
        service_Price4_low: 999,
        service_Price4_high: 1199,
        service_Price5: 'Rs.350-Rs.400',
        service_Price5_low: 350,
        service_Price5_high: 400,
    },
    {
        Category: 'Cook',
        image: heroLower_Cook,
        // URL: 'https://prowork.live/services/cook',
        URL: 'http://localhost:5000/services/cook',
        Price: "Rs.800 per week",
        PriceAdd: 800,
        Travel: 70
    },
    {
        Category: 'Talior',
        image: heroLower_Talior,
        // URL: 'https://prowork.live/services/talior'
        URL: 'http://localhost:5000/services/talior'
    },
    {
        Category: 'Contractor',
        image: heroLower_Contractor,
        // URL: 'https://prowork.live/services/contractor'
        URL: 'http://localhost:5000/services/contractor'
    },
    {
        Category: 'Labourer',
        image: Category_Labourer,
        // URL: 'https://prowork.live/services/labourer',
        URL: 'http://localhost:5000/services/labourer',
        Price: "Rs.500 per day",
        PriceAdd: 500,
        Travel: 0
    },
    {
        Category: 'Tutor',
        image: Category_Tutor,
        // URL: 'https://prowork.live/services/tutor',
        URL: 'http://localhost:5000/services/tutor',
        Price: "Rs.1500 per month",
        PriceAdd: 1500,
        Travel: 0
    },
    {
        Category: 'Mechanic',
        image: Category_Mechanic,
        // URL: 'https://prowork.live/services/mechanic'
        URL: 'http://localhost:5000/services/mechanic'
    }
]
