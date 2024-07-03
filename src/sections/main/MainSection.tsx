import { Card } from '@/components/card';
import styles from './styles.module.scss';
import { Section } from '@/components/section';
import { bindClassNames } from '@/utils/styles';

const cx = bindClassNames(styles);

const MainSection = () => {
  return (
    <Section className={cx('section')}>
      <h2 className={cx('title')}>Featured Apps</h2>
      <div className={cx('grid')}>
        <Card>
          <h3 className="text-xl font-semibold">App1</h3>
          <p className="text-gray-700">This is a description for App 1</p>
        </Card>
        <Card>
          <h3 className="text-xl font-semibold">App2</h3>
          <p className="text-gray-700">This is a description for App 2</p>
        </Card>
        <Card>
          <h3 className="text-xl font-semibold">App2</h3>
          <p className="text-gray-700">This is a description for App 2</p>
        </Card>
      </div>
    </Section>
  );
};

export default MainSection;
