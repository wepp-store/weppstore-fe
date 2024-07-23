import {
  RHFInput,
  RHFSelect,
  RHFTextArea,
  FormProvider,
  RHFColorPicker,
} from '@/shared/ui/hook-form';
import { Section } from '@/shared/ui/section';
import {
  Button,
  Divider,
  Image,
  // modal
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from '@nextui-org/react';
import { Plus } from 'lucide-react';
import React from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { getManifest, resizeManifestIcons } from './utils';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

const defaultValues = {
  name: '',
  shortName: '',
  startUrl: '/',
  description: '',
  display: 'standalone',
  backgroundColor: '#ffffff',
  themeColor: '#000000',
};

const manifestSchema = yup.object().shape({
  name: yup.string().required('이름을 입력해주세요.'),
  shortName: yup.string().required('짧은 이름을 입력해주세요.'),
  startUrl: yup.string().required('시작 URL을 입력해주세요.'),
  display: yup.string().required('디스플레이 모드를 선택해주세요.'),
  backgroundColor: yup.string().required('배경색을 입력해주세요.'),
});

const ManifestStep = () => {
  const addIconRef = React.useRef<HTMLInputElement | null>(null);
  const [icons, setIcons] = React.useState<
    { src: string; sizes: string; type: string }[]
  >([]);

  const methods = useForm({
    defaultValues,
    resolver: yupResolver(manifestSchema),
  });

  const { handleSubmit, watch } = methods;

  const { isOpen, onOpenChange, onOpen, onClose } = useDisclosure();

  const values = watch();

  const handleCopy = () => {
    navigator.clipboard.writeText(getManifest(values));
    toast.success('복사되었습니다.');
  };

  const handleDownload = () => {
    const blob = new Blob([getManifest(values)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'manifest.json';
    a.click();
    URL.revokeObjectURL(url);

    toast.success('다운로드되었습니다.');
  };

  const addIcons = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const resizedIcons = await resizeManifestIcons(file);
      setIcons(resizedIcons);
    }
  };

  const handleIconsDownload = () => {
    if (!confirm('모든 아이콘을 다운로드하시겠습니까?')) return;
    icons.forEach((icon) => {
      const a = document.createElement('a');
      a.href = icon.src;
      a.download = `icon-${icon.sizes}.png`;
      a.click();
    });
  };

  return (
    <>
      <Section>
        <h1 className="text-2xl font-semibold mb-4">
          Web App Manifest (manifest.json)
        </h1>
        <p>
          Web App Manifest는 PWA의 메타데이터를 정의하는 JSON 파일입니다. 이
          파일은 애플리케이션이 설치 가능한 웹 애플리케이션으로 인식되도록 하며,
          앱의 아이콘, 이름, 시작 URL, 화면 모드 등의 정보를 제공합니다.
        </p>
      </Section>

      <Divider />

      <FormProvider methods={methods} onSubmit={handleSubmit(onOpen)}>
        <Section>
          <h2 className="text-2xl font-semibold mb-4">Manifest 만들기</h2>

          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-4 md:flex-row">
              <RHFInput
                isRequired
                label="App name"
                name="name"
                placeholder="My Progressive Web App"
                description="애플리케이션의 전체 이름입니다. 설치된 애플리케이션 목록에 표시됩니다."
              />
              <RHFInput
                isRequired
                label="Short Name"
                name="shortName"
                placeholder="MyPWA"
                description="애플리케이션의 짧은 이름입니다. 홈 화면에 아이콘과 함께 표시됩니다."
              />
            </div>
            <div className="flex flex-col gap-4 md:flex-row">
              <RHFInput
                label="Start url"
                name="startUrl"
                placeholder="/main"
                description="애플리케이션이 시작되는 URL입니다."
              />
              <RHFSelect
                label="Display"
                name="display"
                options={[
                  { label: 'fullscreen', value: 'fullscreen' },
                  { label: 'standalone', value: 'standalone' },
                  { label: 'minimal-ui', value: 'minimal-ui' },
                  { label: 'browser', value: 'browser' },
                ]}
                defaultValue="standalone"
                description="애플리케이션의 화면 모드를 지정합니다. (fullscreen, standalone, minimal-ui, browser 등)"
              />
            </div>
            <RHFTextArea
              label="Description"
              name="description"
              placeholder="A description of your PWA"
              minRows={10}
            />

            <div className="flex gap-4">
              <RHFColorPicker
                label="Theme Color"
                name="themeColor"
                placeholder="#000000"
              />
              <RHFColorPicker
                isRequired
                label="Background Color"
                name="backgroundColor"
                placeholder="#000000"
              />
            </div>

            <div>
              <div className="flex flex-col w-full">
                <div className="text-sm mb-1 flex items-center">
                  Icons
                  {!!icons.length && (
                    <Button
                      size="sm"
                      variant="faded"
                      className="ml-8"
                      onPress={handleIconsDownload}
                    >
                      다운로드
                    </Button>
                  )}
                </div>
                <div className="flex gap-4">
                  <label htmlFor="manifest-icon">
                    <Button
                      variant="bordered"
                      className="w-16 h-16 round-md"
                      onPress={() => addIconRef.current?.click()}
                      isIconOnly
                    >
                      <Plus />
                    </Button>

                    <input
                      ref={addIconRef}
                      type="file"
                      id="manifest-icon"
                      onChange={addIcons}
                      className="hidden"
                    />
                  </label>
                  {icons.map((icon, index) => (
                    <div
                      key={index}
                      className="flex flex-col gap-2 items-center"
                    >
                      <Image
                        src={icon.src}
                        alt="App Icon"
                        className="w-16 h-16 object-cover"
                      />
                      <div className="text-tiny text-foreground-400">
                        {icon.sizes}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="p-1 text-tiny text-foreground-400">
                  애플리케이션 아이콘의 배열로, 다양한 크기와 포맷을 포함합니다.
                  48 ~ 512px 크기의 PNG 이미지를 생성합니다.
                </div>
              </div>
            </div>
          </div>
        </Section>

        <Divider className="my-4" />

        <Section className="flex justify-end">
          <Button color="primary" type="submit">
            생성하기
          </Button>
        </Section>
      </FormProvider>

      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        scrollBehavior="inside"
        size="lg"
      >
        <ModalContent>
          <ModalHeader>Manifest.json</ModalHeader>
          <ModalBody>
            <div className="flex justify-end gap-4">
              <Button
                size="sm"
                color="primary"
                variant="bordered"
                onPress={handleDownload}
              >
                다운로드
              </Button>
              <Button size="sm" color="primary" onPress={handleCopy}>
                복사
              </Button>
            </div>

            <pre className="text-xs bg-gray-800 text-white p-4 rounded-lg overflow-x-auto">
              <code>{getManifest(values)}</code>
            </pre>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onPress={onClose}>
              닫기
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ManifestStep;
