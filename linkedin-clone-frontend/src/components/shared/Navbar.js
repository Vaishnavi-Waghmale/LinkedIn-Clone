
import logo from '../../assets/images/LinkedIn_Logo.svg.png';
import { Icon } from '@iconify/react';

const Navbar = () => {
    return (
        <div className="navbar w-full h-1/10 px-40 py-1 flex items-center justify-between">
            <img src={logo} alt="linkedIn" className='h-20' />
            <div className='flex h-full items-center justify-between w-1/2'>
                <div className='cursor-pointer text-gray-400 hover:text-gray-800 flex flex-col items-center justify-center'>
                    <Icon className='text-3xl ' icon="majesticons:article-line" />
                    <div className='text-sm'>
                        Articles
                    </div>
                </div>
                <div className='cursor-pointer text-gray-400 hover:text-gray-800 flex flex-col items-center justify-center'>
                    <Icon className='text-3xl' icon="healthicons:people" />
                    <div className='text-sm'>
                        People
                    </div>
                </div>
                <div className='cursor-pointer text-gray-400 hover:text-gray-800 flex flex-col items-center justify-center'>
                    <Icon className='text-3xl ' icon="fluent:learning-app-24-regular" />
                    <div className='text-sm'>
                        Learning
                    </div>
                </div>
                <div className='cursor-pointer text-gray-400 hover:text-gray-800 flex flex-col items-center justify-center'>
                    <Icon className='text-3xl ' icon="mingcute:suitcase-2-fill" />
                    <div className='text-sm'>
                        Jobs
                    </div>
                </div>
                <div className='border-r border-gray-400 h-3/4'></div>
                <div className='cursor-pointer text-sm font-semibold py-3 px-5 rounded-full hover:bg-gray-100'>
                    Join Now
                </div>
                <div className='cursor-pointer text-sm font-semibold text-blue-300 border border-blue-400 py-3 px-5 rounded-full hover:bg-blue-100'>
                    Sign In
                </div>

            </div>
        </div>
    );
};

export default Navbar;