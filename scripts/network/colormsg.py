class ColorMsg:

    def success(self, message):
        print("\033[1;32;40m SUCCESS: "+message)

    def error(self, message):
        print("\033[1;31;40m ERROR: "+message)

    def caution(self, message):
        print("\033[1;33;40m CAUTION: "+message)