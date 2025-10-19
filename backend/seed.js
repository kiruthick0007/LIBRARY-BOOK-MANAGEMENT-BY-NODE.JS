import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/User.js';
import Category from './models/Category.js';
import Book from './models/Book.js';

dotenv.config();

const seedData = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB Connected for seeding...');

    // Clear existing data
    await User.deleteMany({});
    await Category.deleteMany({});
    await Book.deleteMany({});
    console.log('Cleared existing data');

    // Create Admin User
    const admin = await User.create({
      name: 'Admin User',
      email: 'admin@library.com',
      password: 'admin123',
      role: 'admin',
      phone: '1234567890',
      address: '123 Admin Street'
    });

    // Create Regular Users
    const user1 = await User.create({
      name: 'John Doe',
      email: 'john@example.com',
      password: 'password123',
      phone: '9876543210',
      address: '456 User Avenue'
    });

    const user2 = await User.create({
      name: 'Jane Smith',
      email: 'jane@example.com',
      password: 'password123',
      phone: '5551234567',
      address: '789 Reader Lane'
    });

    console.log('Users created');

    // Create Categories
    const fiction = await Category.create({
      name: 'Fiction',
      description: 'Fictional literature and novels'
    });

    const nonFiction = await Category.create({
      name: 'Non-Fiction',
      description: 'Non-fictional books and documentaries'
    });

    const science = await Category.create({
      name: 'Science',
      description: 'Scientific literature and research'
    });

    const technology = await Category.create({
      name: 'Technology',
      description: 'Technology and computer science books'
    });

    const history = await Category.create({
      name: 'History',
      description: 'Historical books and biographies'
    });

    const selfHelp = await Category.create({
      name: 'Self-Help',
      description: 'Self-improvement and motivational books'
    });

    console.log('Categories created');

    // Create Books
    const books = [
      {
        title: 'The Great Gatsby',
        author: 'F. Scott Fitzgerald',
        isbn: '978-0743273565',
        category: fiction._id,
        publisher: 'Scribner',
        publishedDate: new Date('1925-04-10'),
        pages: 180,
        language: 'English',
        description: 'The story of the mysteriously wealthy Jay Gatsby and his love for the beautiful Daisy Buchanan.',
        coverImage: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400',
        totalCopies: 5,
        availableCopies: 5,
        shelfLocation: 'A-101'
      },
      {
        title: 'To Kill a Mockingbird',
        author: 'Harper Lee',
        isbn: '978-0061120084',
        category: fiction._id,
        publisher: 'Harper Perennial',
        publishedDate: new Date('1960-07-11'),
        pages: 324,
        language: 'English',
        description: 'A gripping, heart-wrenching, and wholly remarkable tale of coming-of-age in a South poisoned by virulent prejudice.',
        coverImage: 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=400',
        totalCopies: 4,
        availableCopies: 4,
        shelfLocation: 'A-102'
      },
      {
        title: 'Sapiens: A Brief History of Humankind',
        author: 'Yuval Noah Harari',
        isbn: '978-0062316097',
        category: nonFiction._id,
        publisher: 'Harper',
        publishedDate: new Date('2015-02-10'),
        pages: 443,
        language: 'English',
        description: 'From a renowned historian comes a groundbreaking narrative of humanity\'s creation and evolution.',
        coverImage: 'https://images.unsplash.com/photo-1589998059171-988d887df646?w=400',
        totalCopies: 6,
        availableCopies: 6,
        shelfLocation: 'B-201'
      },
      {
        title: 'A Brief History of Time',
        author: 'Stephen Hawking',
        isbn: '978-0553380163',
        category: science._id,
        publisher: 'Bantam',
        publishedDate: new Date('1988-04-01'),
        pages: 256,
        language: 'English',
        description: 'A landmark volume in science writing, exploring the mysteries of the universe.',
        coverImage: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?w=400',
        totalCopies: 3,
        availableCopies: 3,
        shelfLocation: 'C-301'
      },
      {
        title: 'Clean Code',
        author: 'Robert C. Martin',
        isbn: '978-0132350884',
        category: technology._id,
        publisher: 'Prentice Hall',
        publishedDate: new Date('2008-08-01'),
        pages: 464,
        language: 'English',
        description: 'A handbook of agile software craftsmanship.',
        coverImage: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=400',
        totalCopies: 8,
        availableCopies: 8,
        shelfLocation: 'D-401'
      },
      {
        title: 'The Pragmatic Programmer',
        author: 'Andrew Hunt and David Thomas',
        isbn: '978-0135957059',
        category: technology._id,
        publisher: 'Addison-Wesley',
        publishedDate: new Date('2019-09-13'),
        pages: 352,
        language: 'English',
        description: 'Your Journey to Mastery - 20th Anniversary Edition.',
        coverImage: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=400',
        totalCopies: 5,
        availableCopies: 5,
        shelfLocation: 'D-402'
      },
      {
        title: '1984',
        author: 'George Orwell',
        isbn: '978-0451524935',
        category: fiction._id,
        publisher: 'Signet Classic',
        publishedDate: new Date('1949-06-08'),
        pages: 328,
        language: 'English',
        description: 'A dystopian social science fiction novel and cautionary tale.',
        coverImage: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=400',
        totalCopies: 4,
        availableCopies: 4,
        shelfLocation: 'A-103'
      },
      {
        title: 'The Art of War',
        author: 'Sun Tzu',
        isbn: '978-1599869773',
        category: history._id,
        publisher: 'Pax Librorum',
        publishedDate: new Date('2009-05-01'),
        pages: 273,
        language: 'English',
        description: 'An ancient Chinese military treatise dating from the 5th century BC.',
        coverImage: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400',
        totalCopies: 3,
        availableCopies: 3,
        shelfLocation: 'E-501'
      },
      {
        title: 'Atomic Habits',
        author: 'James Clear',
        isbn: '978-0735211292',
        category: selfHelp._id,
        publisher: 'Avery',
        publishedDate: new Date('2018-10-16'),
        pages: 320,
        language: 'English',
        description: 'An Easy & Proven Way to Build Good Habits & Break Bad Ones.',
        coverImage: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400',
        totalCopies: 7,
        availableCopies: 7,
        shelfLocation: 'F-601'
      },
      {
        title: 'Thinking, Fast and Slow',
        author: 'Daniel Kahneman',
        isbn: '978-0374533557',
        category: nonFiction._id,
        publisher: 'Farrar, Straus and Giroux',
        publishedDate: new Date('2011-10-25'),
        pages: 499,
        language: 'English',
        description: 'The definitive account of how we think in a modern world.',
        coverImage: 'https://images.unsplash.com/photo-1519682337058-a94d519337bc?w=400',
        totalCopies: 4,
        availableCopies: 4,
        shelfLocation: 'B-202'
      }
    ];

    await Book.insertMany(books);
    console.log('Books created');

    console.log('\n✅ Database seeded successfully!');
    console.log('\n📝 Login Credentials:');
    console.log('Admin - Email: admin@library.com, Password: admin123');
    console.log('User1 - Email: john@example.com, Password: password123');
    console.log('User2 - Email: jane@example.com, Password: password123');

    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedData();
