import './banner.scss';

export default function BannerComponent(prop: { message?: string }) {
  return (
    <div className='banner'> {prop.message || 'Страница в разработке'}</div>
  );
}
