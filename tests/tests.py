import unittest
from collections import Counter
from sotu.word_count import get_word_freq


class DescribeTests(unittest.TestCase):
    """TestCase skeleton."""

    def test_name_of_test(self):
        """An single test."""

        assert True

    def test_get_word_freq(self):

        counter = Counter(['a', 'a', 'b', 'c'])

        result = get_word_freq(counter)

        unittest.assertEquals(result, [['a', 5000.0, 2], ['b', 2500.0, 1], ['c', 2500.0, 1]])
