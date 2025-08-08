import { useLayoutSize } from '@/hooks/common/useLayoutSize';
import { Modal, ModalProps } from 'antd';
import classNames from 'classnames';
import { ReactNode } from 'react';
import './okpModal.less';
interface OkpModalProps extends ModalProps {
  children?: ReactNode;
  size?: 'large' | 'mini';
}
export default (props: OkpModalProps) => {
  const { children, size = 'mini' } = props;
  const layoutSize = useLayoutSize();
  return (
    <Modal
      {...props}
      classNames={{
        content: 'okp-modal-content',
      }}
      width={'auto'}
    >
      <div
        className={classNames({
          ['okp-modal-container']: true,
          ['okp-modal-container-large-w']: size === 'large',
          ['okp-modal-container-mini-w']: size === 'mini',
          ['okp-modal-container-large-h']: layoutSize.height > 720,
          ['okp-modal-container-mini-h']: layoutSize.height <= 720,
        })}
      >
        {children}
      </div>
    </Modal>
  );
};
