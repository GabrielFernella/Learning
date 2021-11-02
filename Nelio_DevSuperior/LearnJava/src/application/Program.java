package application;

import java.util.Locale;
import java.util.Scanner;

import entities.Product;

public class Program {

	// Modulo10

	public static void main(String[] args) {

		Locale.setDefault(Locale.US);
		Scanner sc = new Scanner(System.in);

		System.out.println("Enter product data: ");

		System.out.print("Name: ");
		String name = sc.nextLine();

		System.out.print("Price: ");
		double price = sc.nextDouble();

		System.out.print("Quantity: ");
		int quantity = sc.nextInt();

		Product product = new Product(name, price, quantity);

		System.out.println(product);

		sc.close();
	}

}
