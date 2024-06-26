import { InMemoryProductAttachment } from "test/repositories/in-memory-product-attachements";
import { InvalidAttachmentTypeError } from "../../utils/errors/Invalid-attachment-error";
import { UploadAndCreateAttachmentService } from "./upload-and-create-attachments";

let inMemoryAttachmentsRepository: InMemoryProductAttachment
let sut: UploadAndCreateAttachmentService

const mockFile = [
  {
    fieldname: 'file',
    originalname: 'test.jpg',
    encoding: '7bit',
    mimetype: 'image/jpeg',
    path: '/path/to/test.jpg',
    destination: '/path/to',
    filename: 'test.jpg',
    size: 1000,
  },
]
const mockFiles = [
  {
    fieldname: 'file',
    originalname: 'test.jpg',
    encoding: '7bit',
    mimetype: 'image/jpeg',
    path: '/path/to/test.jpg',
    destination: '/path/to',
    filename: 'test.jpg',
    size: 1000,
  },
  {
    fieldname: 'file',
    originalname: 'test1.jpg',
    encoding: '7bit',
    mimetype: 'image/jpeg',
    path: '/path/to/test1.jpg',
    destination: '/path/to',
    filename: 'test1.jpg',
    size: 1000,
  },
  {
    fieldname: 'file',
    originalname: 'test2.jpg',
    encoding: '7bit',
    mimetype: 'image/jpeg',
    path: '/path/to/test2.jpg',
    destination: '/path/to',
    filename: 'test2.jpg',
    size: 1000,
  },
];

describe('Upload and create attachments', () => {
  beforeEach(() => {
    inMemoryAttachmentsRepository = new InMemoryProductAttachment()

    sut = new UploadAndCreateAttachmentService(
      inMemoryAttachmentsRepository,
    )
  })

  it('should be able to upload and create an attachment', async () => {
    const result = await sut.execute({
      files: mockFile,
      product_id: '1'
    })

    
    expect(result.isRight()).toBeTruthy()
    if (result.isRight()) {
      expect(result.value.attachments).toHaveLength(1); 
      expect(result.value.attachments[0].url).toBe('http://localhost:3333/images/test.jpg'  );
      expect(result.value.attachments[0].product_id).toBe('1');
    }
  })

  it('should be able to upload and create 3 attachments', async () => {
    const result = await sut.execute({
      files: mockFiles,
      product_id: '1'
    })

    
    expect(result.isRight()).toBeTruthy()
    if (result.isRight()) {
      expect(result.value.attachments).toHaveLength(3); 
      expect(result.value.attachments[0].url).toBe('http://localhost:3333/images/test.jpg'  );
      expect(result.value.attachments[0].product_id).toBe('1');
    }
  })

  it('should not be able to upload an attachment with invalid file type', async () => {
    const result = await sut.execute({
      files: [{ ...mockFiles[0], mimetype: 'text/plain' }],
      product_id: '1'
    })

    expect(result.isLeft()).toBeTruthy();
    expect(result.value).toBeInstanceOf(InvalidAttachmentTypeError);
  })
})
