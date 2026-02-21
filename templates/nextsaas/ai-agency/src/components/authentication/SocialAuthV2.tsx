import appleImage from '@public/images/icons/apple.svg';
import facebookImage from '@public/images/icons/facebook-v2.svg';
import googleImage from '@public/images/icons/google.svg';
import microsoftImage from '@public/images/icons/microsoft.svg';
import Image from 'next/image';

const SocialAuthV2 = () => {
  return (
    <div className="flex items-center justify-center gap-2">
      <button className="bg-background-4 dark:bg-background-7 flex w-full cursor-pointer items-center justify-center gap-2 rounded-full p-4 transition-transform duration-500 ease-in-out hover:-translate-y-1.5">
        <span className="block size-6">
          <Image src={googleImage} alt="google" className="size-full" />
        </span>
      </button>
      <button className="bg-background-4 dark:bg-background-7 flex w-full cursor-pointer items-center justify-center gap-2 rounded-full p-4 transition-transform duration-500 ease-in-out hover:-translate-y-1.5">
        <span className="block size-6">
          <Image src={facebookImage} alt="facebook" className="size-full" />
        </span>
      </button>
      <button className="bg-background-4 dark:bg-background-7 flex w-full cursor-pointer items-center justify-center gap-2 rounded-full p-4 transition-transform duration-500 ease-in-out hover:-translate-y-1.5">
        <span className="block size-6">
          <Image src={appleImage} alt="apple" className="size-full dark:invert" />
        </span>
      </button>
      <button className="bg-background-4 dark:bg-background-7 flex w-full cursor-pointer items-center justify-center gap-2 rounded-full p-4 transition-transform duration-500 ease-in-out hover:-translate-y-1.5">
        <span className="block size-6">
          <Image src={microsoftImage} alt="microsoft" className="size-full" />
        </span>
      </button>
    </div>
  );
};

export default SocialAuthV2;
