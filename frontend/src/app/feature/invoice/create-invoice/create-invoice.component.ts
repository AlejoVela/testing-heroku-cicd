import { Component, OnDestroy, OnInit } from "@angular/core";
import { DocumentTypesService } from "src/app/services/document-types.service";
import { PaymentTypesService } from "src/app/services/payment-types.service";
import { Subscription } from "rxjs";
import { PaymentType } from "@core/models/payment-type.interface";
import { DocumentType } from "@core/models/document-type.interface";
import { map, tap } from "rxjs/operators";
import { CustomerService } from "src/app/services/customer.service";
import { UsersService } from "src/app/services/users.service";
import { ProductsService } from "src/app/services/products.service";
import { InvoiceViewModel } from "../models/invoice-view-model";
import { InvoiceService } from "src/app/services/invoice.service";

export interface invoice {
  product: string;
  description: string;
  amount: string;
  price: string;
  discount: string;
  taxes: string;
  total: string;
}

const ELEMENT_DATA: invoice[] = [{ product: "", description: "", amount: "", price: "", discount: "", taxes: "", total: "" }];

@Component({
  selector: "app-create-invoice",
  templateUrl: "./create-invoice.component.html",
  styleUrls: ["./create-invoice.component.scss"]
})
export class CreateInvoiceComponent implements OnInit, OnDestroy {
  values: InvoiceViewModel = {
    price: 0,
    total: 0,
    amount: 0,
    totalB: 0,
    subTotal: 0,
    totalNeto: 0,
    totalPay: 0,
    selectedProduct: "",
    documentType: "",
    date: "",
    customerIdentification: "",
    branchOffice: 0,
    seller: "",
    paymentId: ""
  };

  paymentTypes: PaymentType[] = [];
  documentTypes: DocumentType[] = [];
  customers: [];
  sellers: [];
  products: [];
  displayedColumns: string[] = ["product", "description", "amount", "price", "discount", "taxes", "total"];
  dataSource = ELEMENT_DATA;

  paymentTypesSub: Subscription;
  documentTypesSub: Subscription;
  customersSub: Subscription;
  sellerSub: Subscription;
  productSub: Subscription;

  selectedProduct: any;

  constructor(
    private _paymentTypeService: PaymentTypesService,
    private _documentTypeService: DocumentTypesService,
    private _customerService: CustomerService,
    private _userService: UsersService,
    private _productsService: ProductsService,
    private _invoiceService: InvoiceService
  ) {}

  ngOnInit(): void {
    this.paymentTypesSub = this._paymentTypeService.getPaymentTypes().subscribe((payments) => {
      this.paymentTypes = payments;
    });

    this.documentTypesSub = this._documentTypeService.getDocumentTypes().subscribe((documents) => {
      this.documentTypes = documents;
    });
  }

  public onDate(event): void {
    this.values.date = event;
    console.log(event);
  }

  selectCustomer(customerSelected) {
    this.values.customerIdentification = customerSelected;
  }

  selectSeller(sellerSelected) {
    this.values.seller = sellerSelected;
  }

  selectProduct(selectedProduct) {
    this.values.selectedProduct = selectedProduct;
  }

  getSuggestionCustomer() {
    this.customersSub = this._customerService
      .getCustomers()
      .pipe(
        map((data) => data.results.filter((el) => el.name)),
        map((data) => data.map((el) => ({ id: el.identification, value: `${el.identification} - ${el.name[0]}` })))
      )
      .subscribe((data) => {
        this.customers = data.slice(0, 3);
      });
  }

  getSuggestionSeller() {
    this.sellerSub = this._userService
      .getSellers()
      .pipe(
        map((data) => data.results),
        map((data) => data.map((el) => ({ id: el.id, value: `${el.username} - ${el.first_name}` }))),
        tap(console.log)
      )
      .subscribe((data) => {
        this.sellers = data.slice(0, 3);
      });
  }

  ngOnDestroy(): void {
    this.paymentTypesSub.unsubscribe();
    this.documentTypesSub.unsubscribe();
    this.customersSub.unsubscribe();
    this.sellerSub.unsubscribe();
    this.productSub.unsubscribe();
  }

  onSave() {
    const invoice = {
      document: {
        id: parseInt(this.values.documentType)
      },
      date: "2020-12-04",
      customer: {
        identification: this.values.customerIdentification,
        branch_office: this.values.branchOffice
      },
      seller: this.values.seller,
      items: [
        {
          code: this.values.selectedProduct,
          quantity: this.values.amount,
          price: this.values.price
        }
      ],
      payments: [
        {
          id: this.values.paymentId,
          value: this.values.total
        }
      ]
    };

    this._invoiceService.createInvoice(invoice).subscribe(result => console.log(result));
  }

  onAdd() {}

  getSuggestionProducts() {
    this.productSub = this._productsService
      .getProducts()
      .pipe(
        map((data) => data.results),
        map((data) => data.map((el) => ({ id: el.code, value: `${el.code} - ${el.name}` }))),
        tap(console.log)
      )
      .subscribe((data) => {
        this.products = data.slice(0, 3);
      });
  }

  calculate() {
    this.values.total = this.values.amount * this.values.price;
    this.values.totalB = this.values.total;
    this.values.subTotal = this.values.total;
    this.values.totalNeto = this.values.total;
    this.values.totalPay = this.values.total;
  }

  saveInvoice() {}
}
