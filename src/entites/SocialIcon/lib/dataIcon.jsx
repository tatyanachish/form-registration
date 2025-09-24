import { Facebook, InstagrammIcon, PinterestIcon, XIcon, YoutubeIcon,  } from "../../../shared/assets/SocialIcon";

export const dataIcon = [
    {
        id: 1,
        icon: (color) => <Facebook color={color}/>,
        href: 'https://facebook.com/'

    },
        {
        id: 2,
        icon: (color) => <PinterestIcon color={color} />,
        href: 'https://www.pinterest.com/'
    },
    {
        id: 3,
        icon:  (color) => <InstagrammIcon color={color}/>,
        href: 'https://www.instagram.com/'
    },
    {
        id: 4,
        icon: (color) => <YoutubeIcon color={color}/>,
        href: 'https://www.youtube.com/'
    },
    {
        id:5,
        icon: (color) => <XIcon   color={color}/>,
        href: 'https://x.com/'
    }
]
