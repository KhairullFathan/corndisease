import blight from '../assets/images/disease/blight.jpeg'
import commonrust from '../assets/images/disease/commonrust.jpg'
import grayspot from '../assets/images/disease/grayspot.jpg'
// import image from '../assets/images/client/01.jpg'
// import image1 from '../assets/images/client/05.jpg'
// import image2 from '../assets/images/client/02.jpg'
// import image3 from '../assets/images/client/04.jpg'
// import image4 from '../assets/images/client/03.jpg'
// import image5 from '../assets/images/client/06.jpg'

const DiseaseArr = [{
  name: "Northern Corn Leaf Blight",
  types: "Disease",
  text: "Northern corn leaf blight (NCLB) is a disease of corn caused by the fungus, Exserohilum turcicum. Severe outbreaks of the disease can cause up to 30-50% yield loss in dent corn if the disease is established before tassel [1]. NCLB also causes significant reduction in quality in sweet corn and silage corn. This publication will outline how to identify the disease, review its lifecycle, as well as appropriate management options for growers.",
  image: blight
},{
  name: "Common Rust",
  types: "Disease",
  text: "Common rust is caused by the fungus Puccinia sorghi. Late occurring infections have limited impact on yield. The fungus overwinters on plants in southern states and airborne spores are wind-blown to northern states during the growing season. Disease development is favored by cool, moist weather (60 – 70◦ F).",
  image: commonrust
},{
  name: "Gray Leaf Spot",
  types: "Disease",
  text: "Grey leaf spot (GLS) is a foliar fungal disease that affects maize, also known as corn. GLS is considered one of the most significant yield-limiting diseases of corn worldwide.[1] There are two fungal pathogens that cause GLS: Cercospora zeae-maydis and Cercospora zeina",
  image: grayspot
}]

const CardDisease = ({name='', types='', text='', image}) => {
  return (
    <div className='rounded-lg shadow-lg dark:shadow-gray-800 p-6 bg-white dark:bg-slate-900'>
      <div className='flex items-center pb-6 border-b border-gray-100 dark:border-gray-800'>
        <div className="ps-4">
          <h3 className='text-lg h5 hover:text-violet-600 duration-500 ease-in-out'>{name}</h3>
          <p className="text-slate-400">{types}</p>
        </div>
      </div>
      <div className="mt-6">
        <img src={image} alt="Disease sample" />
        {/* <p className="text-slate-400 mt-6">{text}</p> */}
      </div>
    </div>
  )
}


const Disease = () => {
  return (
    <>
      <section className="relative md:py-24 py-16 bg-gray-50 dark:bg-slate-800" id="class-disease">
        <div className="container">
          <div className="grid grid-cols-1 pb-8 text-center">
            <h3 className="mb-6 md:text-2xl text-xl font-medium">Class Diseases</h3>
            <p className="text-slate-400 max-w-xl mx-auto">There are three types of classess that you can be classified.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 mt-8 gap-[30px]">
            {
              DiseaseArr?.map((e,i)=>{
                return(
                  <CardDisease key={i} name={e.name} types={e.types} text={e.text} image={e.image}/>
                )
              })
            }
          </div>
        </div>
      </section>
    </>
  )
}

export default Disease