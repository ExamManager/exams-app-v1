import random
import string

def random_password():
    # Define character sets
    uppercase_letters = string.ascii_uppercase
    lowercase_letters = string.ascii_lowercase
    digits = string.digits

    # Generate one character from each set
    random_uppercase = random.choice(uppercase_letters)
    random_lowercase = random.choice(lowercase_letters)
    random_digit = random.choice(digits)

    # Combine and fill the rest of the password with random characters
    combined_sets = uppercase_letters + lowercase_letters + digits
    remaining_length = 8 - 3

    # Generate the remaining characters
    random_remaining = "".join(random.choices(combined_sets, k=remaining_length))

    # Combine characters into a single password
    generated_password = random_uppercase + random_lowercase + random_digit + random_remaining

    # Shuffle the characters to create a random order
    randomized_password = "".join(random.sample(generated_password, len(generated_password)))

    return randomized_password

while True:
    password = random_password()
    print("Generated 8-digit password:", password)