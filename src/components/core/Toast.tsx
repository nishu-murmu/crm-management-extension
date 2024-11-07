import useGlobal from '@/src/hooks/use-global';

const Toast = () => {
  const { toast, setToast } = useGlobal();

  useEffect(() => {
    if (toast.state) {
      const firstTimeout = setTimeout(() => {
        setToast((prevToast) => ({ ...prevToast, state: false }));
      }, 3000);

      const secondTimeout = setTimeout(() => {
        setToast((prevToast) => ({ ...prevToast, message: '' }));
      }, 5000); // 2000 ms after the first timeout

      // Cleanup timeouts on component unmount or when toast changes
      return () => {
        clearTimeout(firstTimeout);
        clearTimeout(secondTimeout);
      };
    }
  }, [toast, setToast]);

  return (
    <div
      className={`cp-absolute cp-bottom-0 cp-inset-x-0 cp-p-4 ${
        toast.state
          ? 'cp-translate-y-0 cp-scale-1'
          : 'cp-scale-0 cp-translate-y-[50%]'
      } cp-transition-ease`}
    >
      <div
        className={`cp-min-w-[200px] cp-w-fit cp-px-5 cp-py-3.5 cp-bg-green cp-rounded-full cp-mx-auto`}
      >
        <p className="cp-text-white cp-text-sm cp-font-semibold cp-text-center">
          {toast.message}
        </p>
      </div>
    </div>
  );
};

export default Toast;
