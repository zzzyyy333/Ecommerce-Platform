package com.ecommerce.application.service;

import com.ecommerce.application.entity.Product;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

@Service
public class ProductExcelService {

    public List<Product> importProducts(MultipartFile file) throws IOException {
        List<Product> products = new ArrayList<>();
        try (Workbook workbook = new XSSFWorkbook(file.getInputStream())) {
            Sheet sheet = workbook.getSheetAt(0);
            Iterator<Row> rows = sheet.iterator();
            
            // 跳过标题行
            if (rows.hasNext()) rows.next();
            
            while (rows.hasNext()) {
                Row row = rows.next();
                Product product = new Product();
                product.setName(getCellValue(row.getCell(0)));
                product.setPrice(Double.parseDouble(getCellValue(row.getCell(1))));
                product.setStock(Integer.parseInt(getCellValue(row.getCell(2))));
                product.setSku(getCellValue(row.getCell(3)));
                products.add(product);
            }
        }
        return products;
    }

    public byte[] exportProducts(List<Product> products) throws IOException {
        try (Workbook workbook = new XSSFWorkbook();
             ByteArrayOutputStream out = new ByteArrayOutputStream()) {
            
            Sheet sheet = workbook.createSheet("Products");
            createHeaderRow(sheet);
            
            int rowNum = 1;
            for (Product product : products) {
                Row row = sheet.createRow(rowNum++);
                row.createCell(0).setCellValue(product.getName());
                row.createCell(1).setCellValue(product.getPrice());
                row.createCell(2).setCellValue(product.getStock());
                row.createCell(3).setCellValue(product.getSku());
            }
            
            workbook.write(out);
            return out.toByteArray();
        }
    }

    private void createHeaderRow(Sheet sheet) {
        Row headerRow = sheet.createRow(0);
        headerRow.createCell(0).setCellValue("商品名称");
        headerRow.createCell(1).setCellValue("价格");
        headerRow.createCell(2).setCellValue("库存");
        headerRow.createCell(3).setCellValue("SKU编码");
    }

    private String getCellValue(Cell cell) {
        if (cell == null) return "";
        switch (cell.getCellType()) {
            case STRING: return cell.getStringCellValue().trim();
            case NUMERIC: return String.valueOf(cell.getNumericCellValue());
            default: return "";
        }
    }
}