<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class PostFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'author_id' => rand(1, 8),
            'title' => $this->faker->text($maxNbChars = 20),
            'content' => $this->faker->text($maxNbChars = 100),
        ];
    }
}
