import pytesseract
from PIL import Image
from docx import Document

def extract_text_from_image(image_path):
    # Load the image from the provided path
    image = Image.open(image_path)
    
    # Use pytesseract to do OCR on the image
    text = pytesseract.image_to_string(image)
    
    return text

def save_text_to_docx(text, docx_path):
    doc = Document()
    doc.add_paragraph(text)
    doc.save(docx_path)

if __name__ == "__main__":
    # Get the image path from user input
    image_path = input("Please enter the path of the image: ")

    # Extract text from the image
    extracted_text = extract_text_from_image(image_path)

    # Construct the path for the .docx file
    docx_path = image_path.rsplit('.', 1)[0] + '.docx'

    # Save the extracted text to the .docx file
    save_text_to_docx(extracted_text, docx_path)

    print(f"Text saved to: {docx_path}")
