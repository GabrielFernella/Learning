package entities;

public class Triangle {

	public double a;
	public double b;
	public double c;

	public double area() {
		double p = (a + b + c) / 2.0;
		double result = Math.sqrt(p * (p - a) * (p - b) * (p - c));

		return result;
	}

}

/*
 * Locale.setDefault(Locale.US); Scanner sc = new Scanner(System.in);
 * 
 * Triangle x, y;
 * 
 * x = new Triangle(); y = new Triangle();
 * 
 * System.out.println("Enter the measures of triangle x: "); x.a =
 * sc.nextDouble(); x.b = sc.nextDouble(); x.c = sc.nextDouble();
 * 
 * System.out.println("Enter the measures of triangle y: "); y.a =
 * sc.nextDouble(); y.b = sc.nextDouble(); y.c = sc.nextDouble();
 * 
 * double areaX = x.area();
 * 
 * double areaY = y.area();
 * 
 * System.out.printf("X area: %.4f%n ", areaX);
 * System.out.printf("Y area: %.4f%n ", areaY);
 * 
 * if (areaX > areaY) { System.out.printf("X é maior"); } else {
 * System.out.printf("Y é maior"); }
 */