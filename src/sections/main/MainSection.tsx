import { Card } from '@/components/card';
import { Section } from '@/components/section';

const MainSection = () => {
  return (
    <Section>
      <h2
        className="
        text-3xl
        font-bold
        text-gray-800
        mb-4"
      >
        Featured Apps
      </h2>
      <div
        className="
        grid
        gap-4
        grid-cols-1
        sm:grid-cols-2
        md:grid-cols-3
      "
      >
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
