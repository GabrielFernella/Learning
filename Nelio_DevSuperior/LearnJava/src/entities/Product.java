package entities;

public class Product {

	private String name;
	private double price;
	private int quantity;

	/**
	 * @param name
	 * @param price
	 * @param quantity
	 */

	public Product() {
	}

	public Product(String name, double price, int quantity) {
		super();
		this.name = name;
		this.price = price;
		this.quantity = quantity;
	}

	public Product(String name, double price) {
		super();
		this.name = name;
		this.price = price;
	}

	/**
	 * @return the name
	 */
	public String getName() {
		return name;
	}

	/**
	 * @param name the name to set
	 */
	public void setName(String name) {
		this.name = name;
	}

	/**
	 * @return the price
	 */
	public double getPrice() {
		return price;
	}

	/**
	 * @param price the price to set
	 */
	public void setPrice(double price) {
		this.price = price;
	}

	/**
	 * @return the quantity
	 */
	public int getQuantity() {
		return quantity;
	}

	public double totalValueStock() {
		return quantity * price;
	}

	public void addProducts(int quantity) {
		this.quantity += quantity;
	}

	public void removeProducts(int quantity) {
		this.quantity -= quantity;
	}

	public String toString() {
		return "Name: " + name + " Price: " + String.format("%.2f", price) + " Quantity: "
				+ String.format("%.2f", totalValueStock());
	}
}

/*
 * public static void main(String[] args) {
 * 
 * Locale.setDefault(Locale.US); Scanner sc = new Scanner(System.in);
 * 
 * System.out.println("Enter product data: ");
 * 
 * System.out.print("Name: "); String name = sc.nextLine();
 * 
 * System.out.print("Price: "); double price = sc.nextDouble();
 * 
 * System.out.print("Quantity: "); int quantity = sc.nextInt();
 * 
 * Product product = new Product(name, price, quantity);
 * 
 * System.out.println(product);
 * 
 * sc.close(); }
 */
