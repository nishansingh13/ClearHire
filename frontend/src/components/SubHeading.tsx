
import headerImage from '../../public/header_resume.svg';
function SubHeading() {
  return (
    <div className='flex flex-col lg:flex-row justify-between items-center min-h-[calc(100%-5rem)] w-full gap-6 lg:gap-0'>
        <div className='w-full lg:w-[40%] px-4 lg:ml-10 text-center lg:text-left'>
            <div className='text-2xl lg:text-4xl wrap-break-word mt-6 lg:mt-10 font-bold'>Upload, Parse, Match, and Hire</div>
            <div className='mt-4 text-gray-600 text-base lg:text-lg'>ClearHire is a smart platform that connects top job-ready talent with companies looking to hire fast. From developers and designers to analysts and engineers — we parse, match, and shortlist candidates with precision.</div>
            <button type="button" className="text-lg lg:text-2xl my-6 text-white font-bold bg-green-600 cursor-pointer py-2 px-4 rounded-md hover:bg-green-700">Hire Top Talent</button>

        </div>

        <div className='w-full lg:w-auto p-4 overflow-hidden rounded-md'>
            <img src={headerImage} className="w-full h-full max-w-md mx-auto object-contain" />

        </div>
    </div>
  )
}

export default SubHeading