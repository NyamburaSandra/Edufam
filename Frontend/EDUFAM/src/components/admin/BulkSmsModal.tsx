import React, { useEffect, useState } from 'react';
import { Modal, Form, Button, Alert } from 'react-bootstrap';
import { useSmsModal } from '../../context/SmsModalContext';

const BulkSmsModal: React.FC = () => {
  const smsModal = useSmsModal();
  const [message, setMessage] = useState('');
  const [recipient, setRecipient] = useState('');
  const [phone, setPhone] = useState('');

  useEffect(() => {
    if (smsModal.parentName && smsModal.parentPhone) {
      setRecipient(smsModal.parentName);
      setPhone(smsModal.parentPhone);
    } else {
      setRecipient('');
      setPhone('');
    }
    setMessage('');
  }, [smsModal.parentName, smsModal.parentPhone, smsModal.show]);

  if (!smsModal.show) return null;

  return (
    <Modal show={smsModal.show} onHide={smsModal.close} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Send Bulk SMS</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Send To</Form.Label>
            <Form.Control type="text" value={recipient} readOnly placeholder="Recipient name" />
            <Form.Text className="text-muted">Phone: {phone || 'N/A'}</Form.Text>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Message</Form.Label>
            <Form.Control
              as="textarea"
              rows={4}
              value={message}
              onChange={e => setMessage(e.target.value)}
              placeholder="Enter your SMS message..."
              maxLength={160}
            />
            <Form.Text className="text-muted">{message.length}/160 characters</Form.Text>
          </Form.Group>
          <Alert variant="info">
            <strong>Recipient Number:</strong> {phone || <span className="text-muted">No number</span>}
          </Alert>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={smsModal.close}>Cancel</Button>
        <Button variant="primary" disabled={!message || !phone}>Send SMS</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default BulkSmsModal;
