import {Roboto} from 'next/font/google';

const roboto = Roboto({
  subsets: ['latin'],
  variable: '--font-roboto',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700', '800'],
});

const fonts = {
  roboto,
};

export default fonts;
